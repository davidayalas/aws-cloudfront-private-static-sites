# Cloudfront + S3 statics sites: login with SAML, authorization and cloudfront signed cookies 

* **Goal**: protect s3 sites under cloudfront, with SAML login and signed cookies. 
* **Bonus**: authorized users are a list into csv queried through AWS S3 Select (authorization could be based in affiliation or whatever)

## Architecture

![architecture](docs/architecture.png) 

## Quick deploy

* Install serverless framework: https://www.serverless.com/framework/docs/getting-started/

* Setup AWS credentials: https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/

* Update "serviceName" with your own in [setup.demo.json](https://github.com/davidayalas/aws-ftp-s3-serverless/blob/master/setup.demo.json#L2)

* Export ENV VARS

        $ export IDP_HOST= idp.your-domain.com
        $ export SAML_CERT="MII...CA"
        $ export AWS_KEYPAIRID=APKAXXXXXXXXXXXXXXX
        $ export AWS_PRIVATEKEY="-----BEGIN RSA PRIVATE KEY----- MII....== -----END RSA PRIVATE KEY-----"

* Execute [first-deploy.sh](first-deploy.sh) (give it executable permissions)

        $ chmod +x first-deploy.sh && sh first-deploy.sh

# Setup details

## Auth / Login page

The [auth page](web/auth.html) is a Cloudfront error page. When cookies aren't present, Cloudfront shows this page to the user and then, login flow is triggered.

In this page you have to setup your cloudfront distribution domain name (first-deploy.sh does it for you).

Once done, you can sync only s3

        $ sls s3sync

## For SAML login

Basic ENV VARS for SAML (your own, because demo is setup):

- SAML_CERT: you idp saml certificate as string
- IDP_HOST: your idp



## For Cloudfront cookie signing 

In order to sign cookies to allow access to protected cloudfront behaviors, you need to go to AWS Console and Create a New Key Pair, under Security Credentials.

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs-procedure

Export two ENV VARS to allow cookie signing:

* AWS_KEYPAIRID
* AWS_PRIVATEKEY