import { NameInput } from "@/components/NameInput";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";


type StoryProps = ComponentProps<typeof NameInput>;


const meta: Meta<StoryProps> = {
  component: NameInput,
  tags: ['autodocs'],  
  argTypes: {
    focusText: { control: { type: 'text' } },
    topText: { control: { type: 'text' } },
    placeholderText: { control: { type: 'text' } },
  }
}

export default meta;

type Story = StoryObj<StoryProps>;

export const DefaultInput: Story = {
  args: {
    focusText: 'INTRODUCE YOURSELF',
    topText: 'CLICK TO TYPE',
    placeholderText: 'Introduce Yourself',
  }, render: ({...args}) => {
    return <NameInput {...args} />
  }
}