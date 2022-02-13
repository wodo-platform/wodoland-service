import { JSONSchemaType } from 'ajv';
import { DemoUserCreateDto } from './demoUser.create.dto';

export const demoUserCreateValidationSchema: JSONSchemaType<DemoUserCreateDto> =
  {
    type: 'object',
    // Type can be: number, integer, string, boolean, array, object or null. see https://ajv.js.org/json-schema.html
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      active: { type: 'boolean' },
    },
    required: ['name', 'email', 'password', 'active'],
    additionalProperties: false,
  };
