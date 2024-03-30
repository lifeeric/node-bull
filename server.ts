import debug from 'debug'
import Queue from 'bull'

const logger = debug('queue')

const videoQueue = new Queue('Video Transcoding', { 
	redis: { port: 6379, host: '127.0.0.1'},
	defaultJobOptions: {
      removeOnComplete: true,
      attempts: 1,
    } 
});



videoQueue.process(async (job, done) => {
	logger('started', job.id)
 // let progress = 0;
  // for(let i = 0; i < 100; i++){
    await new Promise((resolve) => setTimeout(resolve, 10));
    // progress += 10;
    job.progress(100);
  // }
  done()
})


videoQueue.on('completed', async job => {
  logger('Job completed', job?.id);
})

videoQueue.on('stalled', async jobId => {
	logger('Stalled', jobId)
})

videoQueue.on('waiting', async jobId => {
	logger('waiting', jobId)
})

const job = (item:string) => videoQueue.add({video: item})
job('https://ericigt.me')


setTimeout(() => job('new life'), 3000)
