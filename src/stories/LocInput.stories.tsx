import { LocInput } from "@/components/LocInput";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";


type StoryProps = ComponentProps<typeof LocInput>;


const meta: Meta<StoryProps> = {
  component: LocInput,
  tags: ['autodocs'],  
  argTypes: {
    focusText: { control: { type: 'text' } },
    topText: { control: { type: 'text' } },
    placeholderText: { control: { type: 'text' } },
  }
}

export default meta;

type Story = StoryObj<StoryProps>;

export const DefaultLocInput: Story = {
  args: {
    focusText: 'INTRODUCE YOURSELF',
    topText: 'CLICK TO TYPE',
    placeholderText: 'Introduce Yourself',
  }, render: ({...args}) => {
    return <LocInput {...args} />
  }
}