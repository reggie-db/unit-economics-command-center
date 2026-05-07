import { createApp, server } from '@databricks/appkit';
import { registerBrandingRoutes } from './branding.js';

async function main(): Promise<void> {
  const appkit = await createApp({
    plugins: [server({ autoStart: false })],
  });

  appkit.server.extend((app) => {
    registerBrandingRoutes(app);
  });

  await appkit.server.start();
}

main().catch(console.error);
