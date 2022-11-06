export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      description: 'The title of the NFT Drop',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'description',
      type: 'string',
    },
    {
      name: 'nftCollectionName',
      title: 'NFT Collection Name',
      description: 'The name of the NFT Collection',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      description: 'The address of the NFT Collection',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: { type: 'creator' },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'previewImage',
      title: 'Preview image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // Drop List
    {
      name: 'contractType',
      title: 'Contract Type',
      type: 'reference',
      to: { type: 'contractType' },
    },
  ],
};
