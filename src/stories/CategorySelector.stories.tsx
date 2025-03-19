import { CategorySelector } from "@/components/CategorySelector";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof CategorySelector>;

const meta: Meta<StoryProps> = {
  component: CategorySelector,
  tags: ['autodocs'],
  argTypes: {
    sortedData: {
      control: 'object',
      description: 'Sorted data for categories like race, gender, and age',
      defaultValue: {
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
    },
    setShowMobileCategories: {
      action: 'setShowMobileCategories',
      description: 'Function to toggle showing mobile categories',
    },
    showMobileCategories: {
      control: 'boolean',
      description: 'State for showing mobile categories',
      defaultValue: false,
    },
    selectedDemo: {
      control: 'select',
      options: ['race', 'gender', 'age'],
      description: 'Currently selected demo category',
      defaultValue: 'race',
    },
    currentSelectedCategory: {
      control: 'object',
      description: 'Current selected category with key and value',
      defaultValue: { key: 'Asian', value: 50 },
    },
    setSelectedCategories: {
      action: 'setSelectedCategories',
      description: 'Function to set selected categories',
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const DefaultInput: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    sortedData: {
      race: [
        { key: "Asian", value: 50 },
        { key: "Caucasian", value: 30 },
        { key: "Black", value: 20 },
        { key: "White", value: 24 },
        { key: "Hispanic", value: 63 },
        { key: "Middle Eastern", value: 35 },
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
    setShowMobileCategories: (value: boolean | ((prevState: boolean) => boolean)) => {
      console.log(`Show mobile categories: ${value}`);
    },
    showMobileCategories: false, // Initially set to false
    selectedDemo: 'race', // Initially set to 'race'
    currentSelectedCategory: { key: 'Asian', value: 50 }, // Default selected category
    setSelectedCategories: (update) => {
      if (typeof update === "function") {
        console.log("Updated selected categories:", update({
          race: null,
          gender: null,
          age: null,
        }));
      } else {
        console.log("Updated selected categories:", update);
      }
  }},
  render: ({ ...args }) => {
    return <CategorySelector {...args} />;
  },
};
