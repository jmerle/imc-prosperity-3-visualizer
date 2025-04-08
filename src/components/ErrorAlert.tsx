import { Alert, AlertProps, Code, List, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { AlgorithmParseError } from '../utils/algorithm.tsx';

export interface ErrorAlertProps extends Partial<AlertProps> {
  error: Error;
}

export function ErrorAlert({ error, ...alertProps }: ErrorAlertProps): ReactNode {
  return (
    <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" {...alertProps}>
      {error instanceof AlgorithmParseError && (
        <>
          <Text fw="bold">
            Important: before asking for help about this error on Discord or elsewhere, read the prerequisites section
            above and double-check the following:
          </Text>
          <List>
            <List.Item>
              Your code contains the <Code>Logger</Code> class shown in the prerequisites section above.
            </List.Item>
            <List.Item>
              Your code calls <Code>logger.flush()</Code> at the end of <Code>Trader.run()</Code>.
            </List.Item>
            <List.Item>
              Your code does not call Python&apos;s builtin <Code>print()</Code> and uses <Code>logger.print()</Code>{' '}
              instead.
            </List.Item>
          </List>
          <Text fw="bold" mb="sm">
            When asking for help, make it clear that you have double-checked that your code follows these requirements.
          </Text>
        </>
      )}
      {error instanceof AlgorithmParseError ? error.node : error.message}
    </Alert>
  );
}
