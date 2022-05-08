/**
 * Arguments passed to the server.
 */
export class Arguments {
  /**
   * Constructor.
   * @param args {string[]} The arguments passed to the server.
   */
  constructor(private args : string[]) {}

  /**
   * getFilename() returns the filename passed to the server.
   * @returns {string} The filename passed to the server.
   */
  getfilename() : string {
    return this.args[0];
  }

  /**
   * getField() returns the field passed to the server.
   * @returns {string} The field passed to the server.
   */
  getfield() : string {
    return this.args[1];
  }

  /**
   * getArgs() returns the arguments passed to the server.
   * @returns {string[]} returns the arguments passed to the server.
   */
  getArgs() : string[] {
    return this.args;
  }
}
