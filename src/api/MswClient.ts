import Client from './Client';

class MswClient extends Client {
  override async get(path: string) {
    return super.get(`.${path}`);
  }
}

export default MswClient;
