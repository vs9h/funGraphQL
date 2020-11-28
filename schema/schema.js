const {
  GraphQLNonNull, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLBoolean,
} = require('graphql');

const Cards = require('../models/card');
const Collections = require('../models/collection');

const CardType = new GraphQLObjectType({
  name: 'card',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    isAdded: { type: GraphQLNonNull(GraphQLBoolean) },
    collection: {
      type: CollectionType,
      resolve(parent, args) {
        return Collections.findById(parent.collectionId);
      },
    },
  }),
});
const CollectionType = new GraphQLObjectType({
  name: 'collection',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    isAdded: { type: GraphQLNonNull(GraphQLInt) },
    cards: {
      type: GraphQLList(CardType),
      resolve(parent, args) {
        return Cards.find({ collectionId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateCard: {
      type: CardType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        collectionId: { type: (GraphQLID) },
      },
      resolve(parent, args) {
        return Cards.findByIdAndUpdate(args.id,
          { $set: { title: args.title, description: args.description, collectionId: args.collectionId } });
      },
    },
    addCard: {
      type: CardType,
      args: {
        positionAfter: { type: GraphQLID },
        title: { type: GraphQLNonNull(GraphQLString) },
        collectionId: { type: GraphQLNonNull(GraphQLID) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const card = new Cards({
          title: args.title,
          description: args.description,
          collectionId: args.collectionId,
        });
        return card.save();
      },
    },
    deleteCard: {
      type: CardType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Cards.findByIdAndRemove(args.id);
      },
    },
    copyCard: {
      type: CardType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        collectionId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const card = new Cards({
          title: args.title,
          description: args.description,
          collectionId: args.collectionId,
        });
        return card.save();
      },
    },
    updateCollection: {
      type: CollectionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        isAdded: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Collections.findByIdAndUpdate(args.id,
          { $set: { title: args.title, description: args.description, isAdded: args.isAdded } });
      },
    },
    createCollection: {
      type: CollectionType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const collection = new Collections({
          title: args.title,
          description: args.description,
          isAdded: true,
        });
        return collection.save();
      },
    },
  },
});
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    card: {
      type: CardType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Cards.findById(args.id);
      },
    },
    collection: {
      type: CollectionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Collections.findById(args.id);
      },
    },
    collections: {
      type: GraphQLList(CollectionType),
      resolve() {
        return Collections.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
