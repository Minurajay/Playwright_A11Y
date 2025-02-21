import { test } from '../../utils/fixtures'; // Import the fixture
import testDataSets from '../../data/testData.json';
import { checkAccessibility } from '../../utils/accessibility'; // Import accessibility check

test.describe('End-to-End Test', () => {
  for (const testData of testDataSets) {
    test(`Testing for ${testData.login.email}`, async ({
      page,loginPage, searchPage, viewPage, cartPage,
      checkoutPage, orderConfirmPage, orderHistoryPage, orderSummaryPage
    }, testInfo) => {

      await test.step('Login', async () => {
        await loginPage.gotoLoginPage();
        await loginPage.login(testData.login.email, testData.login.password);
        await checkAccessibility(page, testInfo);  // Check a11y after login
      });

      await test.step('Search and view product', async () => {
        await searchPage.searchForProduct(testData.search.product);
        await searchPage.viewProduct();
        await checkAccessibility(page, testInfo);  // Check a11y after product search
      });

      await test.step('Add viewed product to cart', async () => {
        const viewProductDetails = await viewPage.getProductDetails();
        await viewPage.addProductToCart();
        await viewPage.viewCart();
        await cartPage.assertProductDetails(viewProductDetails.name, viewProductDetails.price);
        await checkAccessibility(page, testInfo);  // Check a11y after adding product to cart
      });

      await test.step('Checkout from cart', async () => {
        await cartPage.assertBuyNowButtonEnabled();
        await cartPage.assertRemoveButtonEnabled();
        await cartPage.clickCheckout();
        await checkAccessibility(page, testInfo);  // Check a11y on checkout page
      });

      await test.step('Enter details and place the order', async () => {
        await checkoutPage.assertPreFilledEmail(testData.login.email);
        await checkoutPage.assertCreditCardNumber(testData.checkout.creditCardNumber);
        await checkoutPage.selectExpiryMonthDate(testData.checkout.expiryMonth, testData.checkout.expiryDate);
        await checkoutPage.fillCheckoutDetails(
          testData.checkout.cvv,
          testData.checkout.name,
          testData.checkout.country
        );
        await checkAccessibility(page, testInfo);  // Check a11y on payment page
      });

      await test.step('Confirm order and go to order history', async () => {
        await orderConfirmPage.assertConfirmationHeader();
        const orderId = await orderConfirmPage.getOrderId();
        await orderConfirmPage.clickOrderHistoryButton();
        await orderHistoryPage.assertOrderExists(orderId);
        await checkAccessibility(page, testInfo);  // Check a11y after order confirmation
      });

      await test.step('Verify order details in order summary', async () => {
        await orderSummaryPage.validateHeader();
        await orderSummaryPage.assertDeliveryEmail(testData.login.email);
        await orderSummaryPage.assertDeliveryCountry(testData.checkout.country);
        await checkAccessibility(page, testInfo);  // Final accessibility check
      });

    });
  }
});
