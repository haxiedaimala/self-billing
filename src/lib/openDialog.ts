import {createApp, h} from 'vue';
import Dialog from '@/components/Dialog.vue';

const openDialog = (obj: { ok: (value: string) => any, header: string }) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const close = () => {
    app.unmount();
    div.remove();
  };
  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          modelValue: true,
          'onUpdate:modelValue': () => close(),
          ok: obj.ok
        },
        {
          header: obj.header,
        }
      );
    }
  });
  app.mount(div);
};

export default openDialog;