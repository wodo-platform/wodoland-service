import { JSONSchemaType } from 'ajv';
import { GameCharacterUpdateDto } from './gameCharacter.update.dto';

export const gameCharacterUpdateValidationSchema: JSONSchemaType<GameCharacterUpdateDto> =
  {
    type: 'object',
    // Type can be: number, integer, string, boolean, array, object or null. see https://ajv.js.org/json-schema.html
    properties: {
      id: { type: 'number', minimum: 1 },
      name: { type: 'string' },
      uid: { type: 'number' },
      faction: { type: 'string' },
      charclass: { type: 'string' },
      characterData: { type: 'string' },
      active: { type: 'boolean' },
    },
    required: ['id', 'name', 'uid', 'faction', 'charclass', 'characterData'],
    additionalProperties: false,
  };
