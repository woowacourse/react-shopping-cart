import FixtureClient from './FixtureClient';
import MswClient from './MswClient';

export const client = new FixtureClient();
const mockServerClient = new MswClient();

export default mockServerClient;
