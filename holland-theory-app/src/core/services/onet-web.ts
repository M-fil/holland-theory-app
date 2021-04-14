class OnetWebService {
  static MAIN_URL: string = 'https://services.onetcenter.org/';
  static ERROR_MESSAGES = {
    FAILED_TO_FETCH: 'Failed to fetch',
    DEFAULT_ERROR: 'Error',
  };

  private userName: string;
  private config: {
    auth: {
      username: string,
    },
    baseURL: string,
  };

  constructor(userName: string) {
    this.userName = userName;
    this.config = {
      auth: {
        username: this.userName,
      },
      baseURL: '',
    };
    this.setVersion();
  }

  private setVersion(version: string = ''): void {
    if (!version) {
      this.config.baseURL = `${OnetWebService.MAIN_URL}/ws/`;
    } else {
      this.config.baseURL = `${OnetWebService.MAIN_URL}/v${version}/ws/`;
    }
  }

  public async makeRequest<T>(
    path: string = '', query: string = '', insertFullPath: boolean = false,
  ): Promise<{ error?: string, data?: T }> {
    let url = '';
    if (!insertFullPath) {
      url = `${this.config.baseURL}${path}?client=${this.userName}&${query}`;
    } else {
      const hasQuery = path.includes('?')
      const baseUrlPath = path.slice(0, path.length - 1).replace(this.config.baseURL, '');
      if (hasQuery) {
        url = `${path}&client=${this.userName}`;
      } else {
        url = `${baseUrlPath}?client=${this.userName}${query}`;
      }
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json'
        }
      });
      const isResponseStatusOk = response.status === 200 || response.status === 422;
      if (!isResponseStatusOk) {
        throw new Error(OnetWebService.ERROR_MESSAGES.FAILED_TO_FETCH);
      }

      const result = await response.json();

      if (result?.error) {
        throw new Error(result.error);
      }

      return { data: result };
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      }

      return { error: OnetWebService.ERROR_MESSAGES.DEFAULT_ERROR };
    }
  }
}

export const onetWebService = new OnetWebService(process.env.REACT_APP_ONET_USERNAME as string);
