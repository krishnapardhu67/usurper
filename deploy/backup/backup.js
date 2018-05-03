'use strict';

const token = ''
const bucket = 'usurper-devjon-333680067100-contenful-backup'
const bucketBaseDir = 'contentful-backups'

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const spaceExport = require('contentful-export')

const contentful = require('contentful-management')
const client = contentful.createClient({
  accessToken: token,
})

const fs = require('fs')

const AWS = require('aws-sdk')
const S3 = new AWS.S3({
  signatureVersion: 'v4',
})
const key = (new Date().toISOString() + ".tgz").replace(/[:]/g, "-")

const backupSpaces = async () => {
  try {
    await exec(`rm -rf ./data`)
    await exec(`rm -rf *.tgz`)
    await exec(`mkdir -p data`)

    let spaces = await client.getSpaces()
    let data = spaces.items.map(async (space) => {
      let options = {
        spaceId: space.sys.id,
        managementToken: token,
        errorLogFile: `data/${space}.txt`,
        downloadAssets: true,
        saveFile: true,
        includeDrafts: true,
        exportDir: 'data',
      }

      return spaceExport(options)
    })

    await(Promise.all(data))
    await exec(`tar czf ${key} ./data`)

    let params = {
      Bucket  : bucket,
      Key     : `${bucketBaseDir}/${key}`,
      Body    : fs.readFileSync(key),
    }
    await S3.putObject(params).promise()

    console.log("exported")
  } catch (e) {
    console.log("Error")
    console.log(e)
  }
}

backupSpaces()
