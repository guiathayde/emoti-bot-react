interface Expression {
  look: number;
  part: number;
}

export function convertToNumberArray1Byte(objects: Expression[]): number[] {
  return objects.map((obj) => {
    // Combinar 'look' e 'part' em um único byte
    // 'look' é deslocado 3 bits para a esquerda e 'part' é adicionado
    const combined = (obj.look << 3) | (obj.part & 0x07);

    // Retorna o valor do byte combinado
    return combined;
  });
}
