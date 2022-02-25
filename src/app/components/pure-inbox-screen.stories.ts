import { moduleMetadata, Meta, Story } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { NgxsModule, Store } from '@ngxs/store';
import { fireEvent, within } from '@storybook/testing-library';

import { PureInboxScreenComponent } from './pure-inbox-screen.component';
import { TaskModule } from './task.module';
import { TasksState } from '../state/task.state';

export default {
  component: PureInboxScreenComponent,
  decorators: [
    moduleMetadata({
      declarations: [PureInboxScreenComponent],
      imports: [CommonModule,TaskModule, NgxsModule.forRoot([TasksState])],
      providers: [Store],
    }),
  ],
  title: 'PureInboxScreen',
} as Meta;

const Template: Story = args => ({
  props: args,
});

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
};

export const WithInteractions = Template.bind({});
 WithInteractions.play = async ({ canvasElement }) => {
   const canvas = within(canvasElement);
   // Simulates pinning the first task
   await fireEvent.click(canvas.getByLabelText("pinTask-1"));
   // attr.aria-label is used in play interaction to fireEvent.click(canvas.getByLabelText(<attr.aria-label>)
   // Simulates pinning the third task
   await fireEvent.click(canvas.getByLabelText("pinTask-3"));
 };