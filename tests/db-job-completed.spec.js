const test = require('tape')
const Promise = require('bluebird')
const testQueue = require('./test-queue')
const moment = require('moment')
const enums = require('../src/enums')
const dbJobCompleted = require('../src/db-job-completed')
const testData = require('./test-options').testData

module.exports = function () {
  return new Promise((resolve, reject) => {
    test('db-job-completed test', (t) => {
      t.plan(13)

      const q = testQueue()
      const job = q.createJob(testData)

      q.addJob(job).then((savedJob) => {
        t.equal(savedJob[0].id, job.id, 'Job saved successfully')
        return dbJobCompleted(savedJob[0], testData)
      }).then((changeResult) => {
        t.equal(changeResult.replaced, 1, 'Job updated successfully')
        return q.getJob(job.id)
      }).then((updatedJob) => {
        t.equal(updatedJob[0].status, enums.jobStatus.completed, 'Job status is completed')
        t.ok(moment.isDate(updatedJob[0].dateCompleted), 'Job dateCompleted is a date')
        t.equal(updatedJob[0].progress, 100, 'Job progress is 100')
        t.equal(updatedJob[0].log.length, 1, 'Job log exists')
        t.ok(moment.isDate(updatedJob[0].log[0].logDate), 'Log logDate is a date')
        t.equal(updatedJob[0].log[0].queueId, q.id, 'Log queueId is valid')
        t.equal(updatedJob[0].log[0].logType, enums.log.information, 'Log type is information')
        t.equal(updatedJob[0].log[0].status, enums.jobStatus.completed, 'Log status is completed')
        t.ok(updatedJob[0].log[0].queueMessage, 'Log queueMessage is present')
        t.ok(updatedJob[0].log[0].duration >= 0, 'Log duration is >= 0')
        t.equal(updatedJob[0].log[0].jobData, testData, 'Log jobData is valid')
      }).then(() => {
        resolve()
      }).catch(err => t.fail(err))
    })
  })
}