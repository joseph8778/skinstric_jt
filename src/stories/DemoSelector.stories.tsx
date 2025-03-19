import { DemoSelector } from "@/components/DemoSelector";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof DemoSelector>;

const meta: Meta<StoryProps> = {
  component: DemoSelector,
  tags: ['autodocs'],
  argTypes: {
    sortedData: {
      control: 'object',
      description: 'Sorted data for categories like race, gender, and age',
    },
    setSelectedDemo: {
      action: 'setSelectedDemo',
      description: 'Function to set the selected demo (race, gender, age)',
    },
    setShowMobileCategories: {
      action: 'setShowMobileCategories',
      description: 'Function to toggle showing mobile categories',
    },
    selectedDemo: {
      control: 'select',
      options: ['race', 'gender', 'age'],
      description: 'Currently selected demo category',
    },
    currentSelectedCategory: {
      control: 'object',
      description: 'Current selected category with key and value',
    },
    selectedCategories: {
      control: 'object',
      description: 'Currently selected categories for race, gender, and age',
    }
  }
};

export default meta;

type Story = StoryObj<StoryProps>;

export const DefaultInput: Story = {
  args: {
    sortedData: {
      race: [
        { key: "Asian", value: 50 },
        { key: "Caucasian", value: 30 },
        { key: "Black", value: 20 },
      ],
      gender: [
        { key: "Male", value: 40 },
        { key: "Female", value: 60 },
      ],
      age: [
        { key: "18-24", value: 25 },
        { key: "25-34", value: 35 },
        { key: "35-44", value: 20 },
        { key: "45+", value: 20 },
      ],
    },
    setSelectedDemo: (value: 'race' | 'gender' | 'age') => {
      console.log(`Selected demo: ${value}`);
    },
    setShowMobileCategories: (value: boolean) => {
      console.log(`Show mobile categories: ${value}`);
    },
    selectedDemo: 'race', // This is statically set
    currentSelectedCategory: { key: "Asian", value: 50 },
    selectedCategories: {
      race: { key: "Asian", value: 50 },
      gender: { key: "Male", value: 40 },
      age: { key: "25-34", value: 35 },
    }
  },
  render: ({ ...args }) => {
    return <DemoSelector {...args} />;
  }
};
