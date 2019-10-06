export default class Config {
  constructor() {
    this.config = null;
  }

  /**
   * Get pattern settings.
   * @param name Config is loaded for the pattern with this name.
   * @return Settings for patterns.
   */
  pattern(name) {
    // TODO get config from server
    throw new Error('not implemented');
  }
}
