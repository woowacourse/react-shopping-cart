import FixtureClient from './FixtureClient';
import NetworkClient from './MswClient';

export const client = new FixtureClient();

const netWorkClient = new NetworkClient();

export default netWorkClient;
