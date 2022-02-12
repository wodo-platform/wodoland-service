export interface GameCharacterCreateDto {
  name: string;
  uid: number;
  faction: string;
  charclass: string;
  characterData: string;
  active: boolean;
}
