import Axios from 'axios';
import uuidv4 from 'uuidv4';

const url = 'https://api.cognitive.microsofttranslator.com/translate';

export const translateText = async ({
  text,
  to,
  from,
  key
}: {
  text: string;
  to: string;
  from?: string;
  key: string;
}) => {
  const { data } = await Axios.post<
    [
      {
        detectedLanguage: {
          language: string;
          score: number;
        };
        translations: [
          {
            text: string;
            to: string;
          }
        ];
      }
    ]
  >(
    url,
    [
      {
        text
      }
    ],
    {
      params: {
        'api-version': '3.0',
        to,
        from
      },
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'X-ClientTraceId': uuidv4().toString()
      }
    }
  );

  if (!data.length) {
    throw new Error('No data length');
  }

  if (!data[0].translations.length) {
    throw new Error('No translations length');
  }

  return data[0].translations[0].text;
};
