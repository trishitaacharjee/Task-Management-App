import { app } from './app.js';
import { config } from './shared/config/index.js';

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
