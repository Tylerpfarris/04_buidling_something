require('dotenv').config();

const SES = require('aws-sdk/clients/ses')

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION,
};



let sendDeleteEmail = ({recipientEmail, name, title, quantity}) => {
    let params = {
      Source: process.env.AWS_EMAIL,
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data:
              `${quantity} copy of ${title} has been deleted`
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
  return new SES(SES_CONFIG).sendEmail(params).promise();

};

let sendInsertEmail = ({ recipientEmail, name }, author,  title, quantity) => {
    let params = {
      Source: process.env.AWS_EMAIL,
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data:
              `${quantity} copy of ${title} by author ${author} has been added to the table`
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };

   return new SES(SES_CONFIG).sendEmail(params).promise();
};

let sendUpdateEmail = ({ recipientEmail, name }, author,  title, quantity) => {
    let params = {
      Source: process.env.AWS_EMAIL,
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data:
              `${quantity} copy of ${title} by author ${author} has been updated`
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };

   return new SES(SES_CONFIG).sendEmail(params).promise();
};

let sendTemplateEmail = (recipientEmail) => {
    let params = {
      Source: '<email address you verified>',
      Template: '<name of your template>',
      Destination: {
        ToAddresses: [ 
          recipientEmail
        ]
      },
      TemplateData: '{ \"name\':\'John Doe\'}'
    };
     return new SES(SES_CONFIG).sendEmail(params).promise();
};

module.exports = {
  sendUpdateEmail,
  sendDeleteEmail,
  sendInsertEmail,
  sendTemplateEmail,
};