interface Expression {
  look: number;
  part: number;
}

export function convertToBufferArray1Byte(
  objects: Expression[]
): ArrayBuffer[] {
  return objects.map((obj) => {
    const buffer = new ArrayBuffer(1); // 1 byte
    const view = new DataView(buffer);

    // Combinar 'look' e 'part' em um único byte
    // 'look' é deslocado 3 bits para a esquerda e 'part' é adicionado
    const combined = (obj.look << 3) | (obj.part & 0x07);

    // Define o byte combinado no buffer
    view.setUint8(0, combined); // 0 é o offset

    return buffer;
  });
}
