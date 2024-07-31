import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const pathnames = pathname.split('/').filter((x) => x);
  console.log(pathname)
  return (
    <Breadcrumb spacing="8px" separator=">">
      <BreadcrumbItem>
        <BreadcrumbLink as={RouterLink} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <BreadcrumbItem key={to} isCurrentPage={isLast}>
            <BreadcrumbLink as={RouterLink} to={to} >
              <Text>{value.charAt(0).toUpperCase() + value.slice(1)}</Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbsComponent;
