import { Input } from "@/components/Input";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";


type StoryProps = ComponentProps<typeof Input>;


const meta: Meta<StoryProps> = {
  component: Input,
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
  }
}
