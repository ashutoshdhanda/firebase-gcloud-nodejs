const firebase = require("firebase");
var admin = require("firebase-admin");

var serviceAccount = require("./videobackup-317718-firebase-adminsdk-959ho-d3e5187f78.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'videobackup-317718.appspot.com'
});
console.log("ALL GOOD");

const bucket = admin.storage().bucket('cooke_mp4');

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The directory prefix to search for
const prefix = '03-15/';

// The delimiter to use
// const delimiter = '/';

// Imports the Google Cloud client library
//const {Storage} = require('@google-cloud/storage');

// Creates a client
//const storage = new Storage();

async function listFilesByPrefix() {
  /**
   * This can be used to list all blobs in a "folder", e.g. "public/".
   *
   * The delimiter argument can be used to restrict the results to only the
   * "files" in the given "folder". Without the delimiter, the entire tree under
   * the prefix is returned. For example, given these blobs:
   *
   *   /a/1.txt
   *   /a/b/2.txt
   *
   * If you just specify prefix = 'a/', you'll get back:
   *
   *   /a/1.txt
   *   /a/b/2.txt
   *
   * However, if you specify prefix='a/' and delimiter='/', you'll get back:
   *
   *   /a/1.txt
   */
  const options = {
    prefix: prefix,
  };


  // Lists files in the bucket, filtered by a prefix
  const [files] = await bucket.getFiles(options);

  console.log('Files:');
  files.forEach(file => {
    if (file.metadata.metadata){
      console.log(file.metadata.metadata.fechayhora)
    }
  });
}

listFilesByPrefix().catch(console.error);