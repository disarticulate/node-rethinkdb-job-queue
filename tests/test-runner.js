const Promise = require('bluebird')
const testQueue = require('./test-queue')
const dbAssertDatabase = require('./db-assert-database.spec')
const dbAssertTable = require('./db-assert-table.spec')
const dbAssertIndex = require('./db-assert-index.spec')
const dbAssert = require('./db-assert.spec')
const enums = require('./enums.spec')
const jobOptions = require('./job-options.spec')
const job = require('./job.spec')
const dbChanges = require('./db-changes.spec')
const dbQueueAddJob = require('./db-queue-addjob.spec')
const dbJobCompleted = require('./db-job-completed.spec')
const dbJobFailed = require('./db-job-failed.spec')
const dbReview = require('./db-review.spec')
const dbQueueStatusSummary = require('./db-queue-statussummary.spec')

return dbAssertDatabase().then(() => {
}).then(() => {
  return dbAssertTable()
}).then(() => {
  return dbAssertIndex()
}).then(() => {
  return dbAssert()
}).then(() => {
  return Promise.all([
    enums(),
    jobOptions(),
    job(),
    dbChanges(),
    dbQueueAddJob(),
    dbJobCompleted(),
    dbJobFailed()
  ])
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
  return dbReview()
}).then(() => {
  return dbQueueStatusSummary()
}).then(() => {
  // Note: must stop or delete queue for tests to succeed.
  return testQueue().stop(1)
}).then(() => {
  process.exit()
})
