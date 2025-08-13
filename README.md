# Autofill Bug Reproduction - React Navigation + react-native-screens

This is a minimal reproduction case for an autofill bug that occurs with React Navigation and react-native-screens on Android.

## Bug Description

When using React Navigation with `createNativeStackNavigator` and navigating to a screen with TextInputs that have proper autofill attributes, the autofill functionality is blocked on Android.

### Expected Behavior
- Navigate to Login screen
- Tap on email field
- Android autofill suggestions should appear

### Actual Behavior
- Navigate to Login screen
- Tap on email field
- Android shows "Content can't be autofilled" message
- **Workaround**: Put app in background/overview and return while field is focused → autofill suggestions appear

## Setup & Dependencies

This project includes all required dependencies:

- `@react-navigation/native`: ^7.1.6
- `@react-navigation/native-stack`: ^7.3.25
- `react-native-screens`: ~4.11.1
- `react-native-safe-area-context`: 5.4.0

## Reproduction Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the app:**
   ```bash
   npx expo start
   ```

3. **Run on Android device/emulator:**
   - Press 'a' to run on Android, or scan QR code with Expo Go

4. **Save credentials first (to test autofill later):**
   - Tap "Go to Login" button on Welcome screen
   - Enter any email (e.g., `test@example.com`) and password (e.g., `password123`)
   - Tap "Login" button
   - Android should prompt to save the password → **Accept**
   - You'll see a success screen

5. **Test the autofill bug:**
   - From success screen, tap "Test Autofill Again" to return to login
   - **Clear the form fields** (or they may still contain previous values)
   - Tap on the email field
   - **Expected**: Autofill suggestions appear
   - **Actual Bug**: "Content can't be autofilled" message appears
   - **Workaround test**: Put app in background (recent apps), then return while email field is focused
   - **Result**: Autofill suggestions now appear correctly

## Technical Details

### Login Screen TextInputs Configuration
The TextInputs are properly configured with autofill attributes:

**Email Field:**
```javascript
textContentType="emailAddress"
autoComplete="email"
importantForAutofill="yes"
```

**Password Field:**
```javascript
textContentType="password"
autoComplete="current-password"
secureTextEntry={true}
importantForAutofill="yes"
```

### Navigation Setup
Using standard React Navigation setup:
- `NavigationContainer` wrapper
- `createNativeStackNavigator` (uses react-native-screens)
- Navigation flow: Welcome → Login → Success → Login (for testing)

### Fake Login System
The app includes a fake authentication system:
- Any email/password combination works
- Simulates network delay (1.5s)
- Triggers Android password manager save prompt
- Navigates to success screen after login

## Related Issues
This appears to be a resurfaced bug related to react-native-screens and Android autofill interaction with React Navigation.

## Notes for Testing
- Make sure to accept the password save prompt on first login
- The autofill bug only manifests when navigating TO the login screen via React Navigation
- The workaround (background/foreground) consistently resolves the issue
- This reproduction focuses on the specific interaction between native stack navigation and autofill

## Test Environment
- React Native: 0.79.5
- React: 19.0.0
- Expo: ~53.0.20
