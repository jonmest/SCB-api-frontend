const fastify = require('fastify')()
const getIndexHistory = require('./countyIndex.js')

// To send requests from client app on port 4000
fastify.register(require('fastify-cors'), {
    origin: 'http://localhost:4000'
})

/**
 * SERVER ON PORT 3000
 */
async function start () {
    try {
        console.log('API server running on http://localhost:3000')
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

/**
 * Only route we need, call getIndex() with param :county
 * See param doc for getIndex()
 */
fastify.get('/index/county/:county', async (request, reply) => {
    const response = await getIndexHistory(request.params.county)
    reply.send(response)
})

start()
