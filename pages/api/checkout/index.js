import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import Stripe from 'stripe';
import graphql from '../../../lib/graphql';
import getProductDetailsById from '../../../lib/graphql/queries/getProductDetailsById';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
 
    const {items} = req.body
    const {products} = await graphql.request(getProductDetailsById, {ids: Object.keys(items)});

    const  line_items  = products.map((product) => ({
        //user can change the quantity during checkout

        adjustable_quantity: {
            enabled: true,
            minimum: 1,
        },
        price_data: {
            currency: 'EUR',
            product_data: {
                name: product.name,
                images: product.images.map((img) => img.url)
            },
            // GRAPHCMS already returns the price in the format required by Strapi: $4.99, for instance, should be passed to Stripe as 499.

            unit_amount: product.price,
        },
        quantity: items[product.id],
    }))

    const session  = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items, 
        payment_method_types: ['card', 'sepa_debit'],
        // the server does not know the current URL so we need to write into an environment variable depending on the current evironment
        // locally it should be URL = http:// localhost: 3000

        shipping_address_collection,
        shipping_options,

        success_url: `${process.env.URL}/success`,
        cancel_url: `${process.env.URL}/cancel`

    });

    res.status(201).json({session});

   
}

export const shipping_address_collection ={
    allowed_countries : ['IT', 'US']
}

export const shipping_options = [
    {
        shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 0,
                currency: 'eur',
            },
            display_name: 'Free Shipping',

            delivery_estimate: {
                minimum: {
                    unit: 'business_day',
                    value: 3,
                },
                maximum: {
                    unit: 'business_day',
                    value: 5,
                },
            },
        },
    },
    {
        shipping_rate_data: {
            type: 'fixed_amount',
        
        fixed_amount: {
            amount: 499,
            currency: 'eur',
        },
        display_name: 'Next day air',
        delivery_estimate: {
            minimum: {
                unit: 'business_day',
                value: 1,
            },
        },
        },
    },
]