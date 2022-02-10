import { JSONSchemaType } from 'ajv';
import { DemoUserUpdateDto } from './demoUser.update.dto';

export const demoUserUpdateValidationSchema: JSONSchemaType<DemoUserUpdateDto> =
  {
    type: 'object',
    // Type can be: number, integer, string, boolean, array, object or null. see https://ajv.js.org/json-schema.html
    properties: {
      id: { type: 'number', minimum: 1 },
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      active: { type: 'boolean' },
    },
    required: ['id', 'name', 'email', 'password', 'active'],
    additionalProperties: false,
  };
