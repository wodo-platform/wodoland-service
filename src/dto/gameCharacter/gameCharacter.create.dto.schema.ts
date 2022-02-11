import { JSONSchemaType } from 'ajv';
import { GameCharacterCreateDto } from './gameCharacter.create.dto';

export const gameCharacterCreateValidationSchema: JSONSchemaType<GameCharacterCreateDto> =
  {
    type: 'object',
    // Type can be: number, integer, string, boolean, array, object or null. see https://ajv.js.org/json-schema.html
    properties: {
      name: { type: 'string' },
      uid: { type: 'number' },
      faction: { type: 'string' },
      class: { type: 'string' },
      characterData: { type: 'string' },
      active: { type: 'boolean' },
    },
    required: ['name', 'uid', 'faction', 'class', 'characterData'],
    additionalProperties: false,
  };
