export interface GameCharacterUpdateDto {
  id: number;
  name: string;
  uid: number;
  faction: string;
  charclass: string;
  characterData: string;
  active: boolean;
}
