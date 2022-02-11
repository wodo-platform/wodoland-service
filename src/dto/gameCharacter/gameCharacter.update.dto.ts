export interface GameCharacterUpdateDto {
  id: number;
  name: string;
  uid: number;
  faction: string;
  class: string;
  characterData: string;
  active: boolean;
}
