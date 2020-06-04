const denode = {};

denode.readTextFileSync = fn => {
  if (window.Deno) {
    return Deno.readTextFileSync(fn);
  } else {
    throw new Error('not support yet');
  }
};
denode.writeTextFileSync = (fn, s) => {
  if (window.Deno) {
    return Deno.writeTextFileSync(fn, s);
  } else {
    throw new Error('not support yet');
  }
};
denode.appendTextFileSync = (fn, s) => {
  if (window.Deno) {
    Deno.writeFileSync(fn, new TextEncoder().encode(s), { append: true });
  } else {
    throw new Error('not support yet');
  }
};

export default denode;
