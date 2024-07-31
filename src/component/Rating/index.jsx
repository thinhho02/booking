import { useState } from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Rating = ({ max = 5, onChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <HStack gap={0}>
      {[...Array(max)].map((_, index) => (
        <IconButton
          key={index}
          icon={<StarIcon />}
          colorScheme={index < rating ? 'yellow' : 'gray'}
          onClick={() => handleClick(index + 1)}
          gap={0}
          m={0}
          variant="ghost"
          p={0}
          aria-label={`Rate ${index + 1}`}
        />
      ))}
    </HStack>
  );
};

export default Rating;