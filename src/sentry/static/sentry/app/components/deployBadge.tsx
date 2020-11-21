import React from 'react';

import Link from 'app/components/links/link';
import Tag from 'app/components/tag';
import {IconOpen} from 'app/icons';
import {t} from 'app/locale';
import {Deploy} from 'app/types';
import {QueryResults, stringifyQueryObject} from 'app/utils/tokenizeSearch';

type Props = {
  deploy: Deploy;
  projectId?: number;
  orgSlug?: string;
  version?: string;
  className?: string;
};

const DeployBadge = ({deploy, orgSlug, projectId, version, className}: Props) => {
  const shouldLinkToIssues = !!orgSlug && !!version;

  const badge = (
    <Tag className={className} type="highlight" icon={shouldLinkToIssues && <IconOpen />}>
      {deploy.environment}
    </Tag>
  );

  if (!shouldLinkToIssues) {
    return badge;
  }

  return (
    <Link
      to={{
        pathname: `/organizations/${orgSlug}/issues/`,
        query: {
          project: projectId ?? null,
          environment: deploy.environment,
          query: stringifyQueryObject(new QueryResults([`release:${version!}`])),
        },
      }}
      title={t('Open in Issues')}
    >
      {badge}
    </Link>
  );
};

const Badge = styled(Tag)`
  background-color: ${p => p.theme.textColor};
  color: ${p => p.theme.background};
  font-size: ${p => p.theme.fontSizeExtraSmall};
  align-items: center;
`;

const Label = styled('span')`
  max-width: 100px;
  vertical-align: middle;
  ${overflowEllipsis}
`;

const Icon = styled(IconOpen)`
  margin-left: ${space(0.5)};
  flex-shrink: 0;
`;

export default DeployBadge;
