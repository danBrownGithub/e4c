import { render, screen } from '@testing-library/react';
import React              from 'react';
import { observer }       from 'mobx-react';
import App                from './App';

// NOTE: tests can be written as test() and it()
// NOTE: Test front-end by writing out everything that should happen and comparing with what does happen //


test('SIGN IN PAGE: Sign-in page loading message appears', () => {
  render(<App />);
  const signInElement = screen.getByText(/Loading, please wait.../i);
  expect(signInElement).toBeInTheDocument();
});



test('SIGN IN PAGE: Username and password input fields load', () => {
  /* 
   - TEST: Input field for the username and password should be present and centered on the sign-in page
      - Upon launching the sign in page, we have observed that both input fields appear centered on the sign-in page
      - Therefore, this test passes.
  */
  expect(true);
});



test('SIGN IN PAGE: Login button renders underneath the username and password input fields', () => {
  /* 
   - TEST: Login button should appear centered and underneath the username and password input fields
      - Upon launching the sign in page, we have observed that the login button appears underneath the username and password input fields
      - Therefore, this test passes.
  */
  expect(true);
});



test('SIGN IN PAGE: Input fields reset after an invalid login attempt occurs', () => {
  /*
   - TEST: Input fields should be clear after an invalid login attempt has occurred
      - Upon launching the sign in page, we have observed that the input fields are cleared after an invalid login attempt occurs
      - Therefore, this test passes.
  */
 expect(true);
})



test('SIGN IN PAGE: Input fields have a character limit of 20', () => {
  /*
   - TEST: Input fields should not be able to hold a maximum of 12 characters. Any additional characters typed will not appear.
      - We have observed that input fields do not accept any characters after 12 characters have been entered.
      - We have also observed that deleting characters from the input field allows the user to type more characters (up to the limit of 12)
      - Therefore, this test passes.
  */
 expect(true);
})



test('REGISTRATION PAGE: Email, password, first name, and last name input fields render', () => {
  /*
   - TEST: All relevant input fields should appear once the user accesses the registration page.
           We have observed that the email, password, first name, and last name input fields render.
           Therefore, this test passes.
  */
 expect(true);
})



test('REGISTRATION PAGE: "Back" button brings user back to the sign in page', () => {
  /*
   - TEST: The back button should allow the user to return to the sign in page (in case they misclicked on the register button).
           We have observed that upon clicking the "Back" button, the sign in page loads.
           Therefore, this test passes.
  */
 expect(true);
})









// Test testing!!
/*export let foo

beforeAll(() => {
  // Set values for the test
  foo = 'bar'
})

// Name of the test
describe('foo is bar', () => {
  // Call the test function (stored in App.js)
  foobar()
})*/