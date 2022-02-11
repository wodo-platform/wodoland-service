export interface GameCharacterCreateDto {
  name: string;
  uid: number;
  faction: string;
  class: string;
  characterData: string;
  active: boolean;
}
