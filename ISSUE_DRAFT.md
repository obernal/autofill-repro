# Android autofill blocked when navigating to screen with TextInputs - Issue persists in 2025

## Description

Android autofill functionality is blocked when navigating to a screen containing TextInputs with proper autofill attributes using React Navigation's `createNativeStackNavigator`. The issue shows "Content can't be autofilled" when tapping on TextInput fields, but autofill works correctly after backgrounding and foregrounding the app.

## Related Issues

This appears to be a regression or incomplete fix of previous reports:
- React Navigation: #12210 (marked as solved but issue persists)
- React Native Screens: software-mansion/react-native-screens#349 (very old but exact same reproduction steps)

**Key finding**: The issue persists even with `react-native-screens` disabled, confirming this is a React Navigation core issue, not just a library interaction problem.

## Reproduction Steps

### Minimal Reproduction Repository
https://github.com/[your-username]/autofill-repro (or link to your repo)

### Steps to Reproduce
1. Create app with React Navigation native stack
2. Add screen with properly configured TextInputs (autofill attributes)
3. Manually add credentials to Android password manager for the app package
4. Navigate to the login screen via React Navigation
5. Tap on email/username field
6. **Bug**: "Content can't be autofilled" appears instead of autofill suggestions
7. **Workaround**: Put app in background (recent apps) and return → autofill works

### Expected Behavior
- Autofill suggestions should appear immediately when tapping TextInput fields
- No difference between direct screen access vs. navigated access

### Actual Behavior
- "Content can't be autofilled" message on TextInput focus after navigation
- Autofill works correctly after app backgrounding/foregrounding cycle

## Environment

```
React Navigation: 7.1.6
@react-navigation/native-stack: 7.3.25
React Native: 0.79.5
React: 19.0.0
Platform: Android
```

## Technical Details

### TextInput Configuration
TextInputs are properly configured with all required autofill attributes:

```javascript
// Email field
<TextInput
  textContentType="emailAddress"
  autoComplete="email"
  importantForAutofill="yes"
  // ... other props
/>

// Password field  
<TextInput
  textContentType="password"
  autoComplete="current-password"
  secureTextEntry={true}
  importantForAutofill="yes"
  // ... other props
/>
```

### Navigation Setup
```javascript
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
</NavigationContainer>
```

## Investigation Notes

1. **react-native-screens disabled**: Issue persists, ruling out library interaction
2. **Navigation-triggered**: Issue occurs when navigating TO the login screen
3. **Consistent workaround**: Background/foreground cycle always resolves the issue
4. **Timing related**: Suggests Android autofill service loses context during navigation

## Possible Root Cause

The issue appears to be related to how React Navigation handles screen transitions and Android's autofill service context. The autofill service may lose or fail to establish proper context when screens are mounted via navigation, but regains it after the background/foreground cycle.

## Impact

This significantly impacts user experience for any app using React Navigation with login flows on Android, as users cannot easily access saved credentials without the workaround.

## Workaround

Users must:
1. Navigate to login screen
2. Tap TextInput field (triggers "can't autofill" message)
3. Put app in background (recent apps)
4. Return to app while field is focused
5. Autofill suggestions appear correctly

This workaround is not user-friendly and affects adoption of autofill functionality.