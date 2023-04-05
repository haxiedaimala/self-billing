import Message from '@/components/Message.vue';
import {createApp, h} from 'vue';

type Options = {
  message: string;
  autoClose?: boolean,
  autoCloseDelay?: number,
  modelValue?: boolean,
  showClose?: boolean,
  type?: 'success' | 'error',
}
const messageWrapper = document.createElement('div');
messageWrapper.setAttribute('id', 'message');
document.documentElement.appendChild(messageWrapper);
const openMessage = (options: Options) => {
  const {
    message,
    autoClose = true,
    autoCloseDelay = 3,
    showClose = false,
    modelValue = true,
    type = 'success',
  } = options;
  const div = document.createElement('div');
  messageWrapper.appendChild(div);
  const app = createApp({
    render() {
      return h(
        Message,
        {
          autoClose,
          autoCloseDelay,
          modelValue: modelValue,
          'onUpdate:modelValue': (newValue: boolean) => {
            if (!newValue) {
              app.unmount();
              div.remove();
            }
          },
          showClose,
          type,
        },
        {
          default: () => message
        }
      );
    }
  });
  if (messageWrapper.children.length > 1) {
    messageWrapper.children[0].remove();
  }
  app.mount(div);
};

export default openMessage;