const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { createServer } = require('http');
// const { WebSocketServer } = require('ws');
const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const { useServer } = require('graphql-ws/lib/use/ws');
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const defs = require('./src/typedefs');
const resolvers = require('./src/resolvers');

dotenv.config();

const allowlist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptionsDelegate = () => {
	return {
		origin: allowlist,
	};
};

const app = express();
app.use(cors(corsOptionsDelegate()));
const httpServer = createServer(app);

const loadTypeDefs = Object.values(defs).map((x) => x);
const loadResolvers = Object.values(resolvers).map((x) => x);

const decodeToken = async (token) => {
	try {
		const { exp, ...decoded } = jwt.verify(token, process.env.JWT_SECRET || '');

		if (decoded) {
			return decoded;
		}

		return null;
	} catch (e) {
		console.log('[error]', err.message);
		if (err.message === 'jwt expired') {
			throw err;
		}
	}
};

const createAolloServer = async (app, httpServer) => {
	const schema = applyMiddleware(
		makeExecutableSchema({
			typeDefs: mergeTypeDefs(loadTypeDefs),
			resolvers: mergeResolvers(loadResolvers),
		}),
		// graphqlPermissions
	);

	// const wsServer = new WebSocketServer({
	// 	server: httpServer,
	// 	path: '/graphql',
	// });

	// const serverCleanup = useServer(
	// 	{
	// 		schema,
	// 		context: async ({ connectionParams }) => {
	// 			const { authorization } = connectionParams;
	// 			if (authorization) {
	// 				const [bearerToken, token] = authorization.split(' ') || '';
	// 				if (bearerToken === 'Bearer' && token && token !== 'undefined') {
	// 					const user = await getUser(token);
	// 					return { user, token };
	// 				} else {
	// 					throw new Error('Token expired.');
	// 				}
	// 			} else {
	// 				return null;
	// 			}
	// 		},
	// 	},
	// 	wsServer
	// );

	const apolloServer = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: 'bounded',
		plugins: [
			process.env.NODE_ENV !== 'production'
				? ApolloServerPluginLandingPageGraphQLPlayground()
				: ApolloServerPluginLandingPageDisabled(),
			ApolloServerPluginDrainHttpServer({ httpServer }),
			// {
			// 	async serverWillStart() {
			// 		return {
			// 			async drainServer() {
			// 				await serverCleanup.dispose();
			// 			},
			// 		};
			// 	},
			// },
		],
		context: async ({ req }) => {
			if (req.headers.authorization) {
				const [bearerToken, token] = req.headers.authorization.split(' ') || '';
				if (bearerToken === 'Bearer' && token && token !== 'undefined') {
					const decodedToken = await decodeToken(token);
					return decodedToken;
				} else {
					throw new Error('Token expired.');
				}
			} else {
				return null;
			}
		},
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, path: '/graphql' });

	// httpServer.listen(port, () => {
	// 	console.log(`🚀 Graphql is ready at endpoint /graphql`);
	// });
};

createAolloServer(app, httpServer);

module.exports = httpServer;
