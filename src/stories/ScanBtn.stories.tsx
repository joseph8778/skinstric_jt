import { ScanBtn } from "@/components/ScanBtn";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";


type StoryProps = ComponentProps<typeof ScanBtn>;


const meta: Meta<StoryProps> = {
  component: ScanBtn,
  tags: ['autodocs'],  
  argTypes: {
    scanType: {
        options: ['Gallery', 'Camera'],
        control: {type: 'select'}
        },
      setPopup: {
        control: {type: 'text'}
      }
    }
}

export default meta;

type Story = StoryObj<StoryProps>;

export const DefaultInput: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
        scanType: 'Camera',
  }, render: ({...args}) => {
    return <ScanBtn {...args} />
  }
}