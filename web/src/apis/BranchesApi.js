import { SECURITY_TOKEN } from '../apiConfig';
import { domain } from '../dataTypes';
import { generateGetRequest } from './apiHelpers';

/**
 * core-js and regenerator-runtime imports are necessary to make tests run
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default class BranchesApi {
  static async create(projectId, branchName, refBranch) {
    try {
      const response = await fetch(
        `https://${domain}/api/v4/projects/${projectId}/repository/branches?branch=${branchName}&ref=${refBranch}`, {
          method: 'POST',
          headers: new Headers({
            'PRIVATE-TOKEN': SECURITY_TOKEN,
            'Content-Type': 'application/json',
          }),
        },
      );
      return response.json();
    } catch (err) {
      return err;
    }
  }

  static async getBranches(projectId) {
    const url = `https://${domain}/api/v4/projects/${projectId}/repository/branches`;
    try {
      const response = await fetch(
        url, {
          method: 'GET',
          headers: new Headers({
            'PRIVATE-TOKEN': SECURITY_TOKEN,
          }),
        },
      );
      return response.json();
    } catch (err) {
      return err;
    }
  }

  static async compare(projectId, from, to) {
    const url = `https://${domain}/api/v4/projects/${projectId}/repository/compare?from=${from}&to=${to}`;
    const response = await generateGetRequest(url);

    return response.json();
  }
}
