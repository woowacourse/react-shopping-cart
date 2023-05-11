import Client from './Client';

class FixtureClient extends Client {
  constructor() {
    super();
  }

  override async get(path: string) {
    return super.get(`./fixtures${path}.json`);
  }
}

export default FixtureClient;
