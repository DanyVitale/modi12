/**
 * Import watchFile from fs and spawn from child_process
 */
import {watchFile, existsSync} from 'fs';
import {spawn} from 'child_process';

/**
* Usage describes how to use the server.
*/
if (process.argv.length < 4) {
  console.log('Usage: node dist/server.js <filename> <field>');
  process.exit(1);
}

/**
* If the file doesn't exist, we can't do anything.
*/
// 4
if (!existsSync(process.argv[2])) {
  console.log('File not found');
  process.exit(1);
}

/**
* watchFile(filename, callback) describes the file to watch for changes.
* @param {string} filename
*/
watchFile(process.argv[2], (curr, prev) => {
  console.log(`Previous size: ${prev.size}`);
  console.log(`Current size: ${curr.size}`);

  const filename = process.argv[2];
  const field = process.argv[3];
  const cut = spawn('cut', ['-d', ',', '-f', field, filename]);

  let cutOutput = '';

  cut.stdout.on('data', (data) => {
    cutOutput += data;
  });

  /**
  * When the size of the file is 0, we can assume that the file has been deleted.
  */
  // 6
  if (curr.size === 0) {
    console.log('File deleted');
    process.exit(1);
  }

  /**
  * Close command when the file has been cut.
  */
  cut.on('close', () => {
    const cutArray = cutOutput.split('\n');

    /**
    * If the array has elements like '', we can assume that is an invalid cut.
    */
    // 5
    if (cutArray[0] === '') {
      console.log('Invalid cut');
      process.exit(1);
    }

    console.log(cutArray);
  });
});

// =============================================================================

// import {Arguments} from './Arguments';

// export function clientCode() {
//   const args = new Arguments(process.argv);
//   /**
//    * Usage describes how to use the server.
//    */
//   if (args.getArgs.length < 4) {
//     console.log('Usage: node dist/server.js <filename> <field>');
//     process.exit(1);
//   }

//   /**
//   * If the file doesn't exist, we can't do anything.
//   */
//   // 4
//   if (!existsSync(args.getArgs[2])) {
//     console.log('File not found');
//     process.exit(1);
//   }

//   /**
//   * watchFile(filename, callback) describes the file to watch for changes.
//   * @param {string} filename
//   */
//   watchFile(args.getArgs[2], (curr, prev) => {
//     console.log(prev.size);
//     console.log(curr.size);

//     const filename = args.getArgs[2];
//     const field = args.getArgs[3];
//     const cut = spawn('cut', ['-d', ',', '-f', field, filename]);

//     let cutOutput = '';

//     cut.stdout.on('data', (data) => {
//       cutOutput += data;
//     });

//     /**
//      * When the size of the file is 0, we can assume that the file has been deleted.
//      */
//     // 6
//     if (curr.size === 0) {
//       console.log('File deleted');
//       process.exit(1);
//     }

//     /**
//      * Close command when the file has been cut.
//      */
//     cut.on('close', () => {
//       const cutArray = cutOutput.split('\n');

//       /**
//        * If the array has elements like '', we can assume that is an invalid cut.
//        */
//       // 5
//       if (cutArray[0] === '') {
//         console.log('Invalid cut');
//         process.exit(1);
//       }

//       console.log(cutArray);
//     });
//   });
// }
