import DefaultTheme from 'vitepress/theme';
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // register your custom global components
        app.component('MyGlobalComponent' /* ... */);
    }
};
